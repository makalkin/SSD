(function(window, undefined) {

  window.addEventListener("message", function(e) {
    if (_.has(e.data, 'name') && e.data.name === 'pidoco:calibrateGyroscope') {
      var persist = false;
      if (_.has(e.data, 'persist') && e.data.persist === true) {
        persist = true;
      }
      Fliptiltshake.calibrate(persist);
    }
  }, false);

  var isIOS = navigator.userAgent.match(/iPad|iPhone/),
    isAndroid = navigator.userAgent.match(/Android/);

  var calibrationG = 0,
    calibrationB = 0,
    calibrationA = 0,
    calibrate = 0,
    persistCalibration = false,
    lastG = 0,
    lastB = 0,
    lastA = 0,
    firstEvent = false,
    listener = null,
    logPanel = null,
    debug = false
  ;

  var events = {
    flip: [],
    tilt: [],
    shake: []
  };

  var defaultOptions = {
    flip: {
      threshold: (isIOS) ? 10 : 30,
      enabled: true,
      callback: function() {}
    },
    tilt: {
      threshold: 2,
      angle: 20,
      rotation: 'leftRight',
      direction: null,
      enabled: true,
      callback: function() {}
    },
    shake: {
      threshold: (isIOS) ? 2 : 20,
      sensitive: true,
      durationMin: 700,
      durationMinBetweenShakes: 400,
      enabled: true,
      callback: function() {}
    }
  };

  var inits = {
    flip: function() {
      this.flipped = false;
    },
    tilt: function() {
      this.alreadyAchieve = false;
    },
    shake: function() {
      this.state = 'pause';
      this.stopShakeTimeout = null;
      this.start = null;
    }
  };

  var Fliptiltshake = function(type, options) {
    if (!hasOwnProperty.call(events, type)) {
      throw 'Type ' + type + ' is not supported';
    }

    if (typeof options === 'function') {
      options = {
        enabled: true,
        callback: options
      };
    }

    extend(options, defaultOptions[type]);

    this.type = type;
    this.options = options;

    events[type].push(this);

    this.init = inits[type];
    this.init();

    return this;
  };

  Fliptiltshake.prototype.disable = function() {
    this.enabled = false;
  };

  Fliptiltshake.prototype.enable = function() {
    this.enabled = true;
  };

  var deviceorientation = function(e) {
    var gamma,
      beta,
      alpha,
      deltaG,
      deltaB,
      deltaA;

    if (firstEvent) {
      lastG = e.gamma;
      lastB = e.beta;
      lastA = e.alpha;
      var calibrationValues = getCalibrationValues();
      if (calibrationValues) {
        calibrationG = calibrationValues.gamma;
        calibrationB = calibrationValues.beta;
        calibrationA = calibrationValues.alpha; 
      }
      firstEvent = false;
    }

    if (calibrate) {
      calibrationG = e.gamma;
      calibrationB = e.beta;
      calibrationA = e.alpha;

      if (persistCalibration === true) {
        setCalibrationValues({
          gamma: e.gamma,
          beta: e.beta,
          alpha: e.alpha
        });
      }

      lastG = 0;
      lastB = 0;
      lastA = 0;
      
      calibrate = false;
    }

    gamma = e.gamma;
    beta = e.beta;
    alpha = e.alpha;

    if (isAndroid) {
      if (e.gamma > 180) {
        gamma = - (90 + 270 - e.gamma);
      }
    }

    //log(parseInt(e.gamma), parseInt(e.beta), parseInt(e.alpha));

    gamma = gamma - calibrationG;
    beta = beta - calibrationB;
    alpha = alpha - calibrationA;

    deltaG = Math.abs(lastG - gamma);
    deltaB = Math.abs(lastB - beta);
    deltaA = Math.abs(lastA - alpha);

    deltaG = parseInt(Math.abs((deltaG > 180) ? deltaG - 360 : deltaG));
    deltaB = parseInt(Math.abs((deltaB > 180) ? deltaB - 360 : deltaB));
    deltaG = parseInt(Math.abs((deltaA > 180) ? deltaA - 360 : deltaA));

    log(parseInt(gamma), parseInt(beta), parseInt(alpha));
    //log(parseInt(deltaG), parseInt(deltaB), parseInt(deltaG), events.shake[0].state);

    checkFlip(gamma, beta, alpha);
    checkShake(deltaG, deltaB, deltaA);
    checkTilt(gamma, beta, alpha);

    lastG = gamma;
    lastB = beta;
    lastA = alpha;
  };

  var checkFlip = function(gamma, beta, alpha) {
    for (var i = 0; i < events.flip.length; i++) {
      if (!events.flip[i].options.enabled) continue;
      var flipEvent = events.flip[i];
      var threshold = parseFloat(flipEvent.options.threshold);
      var callback = flipEvent.options.callback;
              
      if (!flipEvent.flipped && valueWithinThreshold(Math.abs(gamma), 180, threshold))
      {
        callback();
        flipEvent.flipped = true;

      } else {
        if (flipEvent.flipped && valueWithinThreshold(gamma, 0, threshold))
        {
            flipEvent.flipped = false;
        }
      }
    }
  };

  var checkShake = function(deltaG, deltaB, deltaA) {
    var currentTime = new Date();

    for (var i = 0; i < events.shake.length; i++) {
      if (!events.shake[i].options.enabled) continue;
      var shakeEvent = events.shake[i];
      var threshold = parseFloat(shakeEvent.options.threshold);
      var sensitive = shakeEvent.options.sensitive;
      var durationMin = parseFloat(shakeEvent.options.durationMin);
      var durationMinBetweenShakes = parseFloat(shakeEvent.options.durationMinBetweenShakes);
      var callback = shakeEvent.options.callback;

      if (
        (
          sensitive &&
          ((deltaG > threshold) || (deltaA > threshold) || (deltaB > threshold))
        )
        ||
        (
          !sensitive &&
          (
            ((deltaG > threshold) && (deltaB > threshold)) || 
            ((deltaG > threshold) && (deltaA > threshold)) || 
            ((deltaB > threshold) && (deltaA > threshold))
          )
        )
      ) {
        if (shakeEvent.state === 'pause') {
          shakeEvent.start = new Date();
          shakeEvent.state = 'shaking';
        }
        clearTimeout(shakeEvent.stopShakeTimeout);
        shakeEvent.stopShakeTimeout = null;
      }

      var duration = (shakeEvent.start) ? currentTime.getTime() - shakeEvent.start.getTime() : 0; 

      if (shakeEvent.state == 'shaking' && duration > durationMin) {
        shakeEvent.state = 'shaked';
        callback();
      }

      // Reset the current shake (don't care if it's terminate or not) after X ms without any move
      if (shakeEvent.stopShakeTimeout === null) {
        // Cancel shake
        (function(shakeEvent) {
          shakeEvent.stopShakeTimeout = setTimeout(function() {
            shakeEvent.start == null;
            shakeEvent.state = 'pause';
          }, durationMinBetweenShakes);
        })(shakeEvent);
      }
    }
  };

  var checkTilt = function(gamma, beta, alpha) {
    for (var i = 0; i < events.tilt.length; i++) {
      if (!events.tilt[i].options.enabled) continue;
      var shakeEvent = events.tilt[i];
      var threshold = parseFloat(shakeEvent.options.threshold);
      var rotation = shakeEvent.options.rotation;
      var direction = shakeEvent.options.direction;
      var callback = shakeEvent.options.callback;
      var angle = parseFloat(shakeEvent.options.angle);

      // Tilt uses gamma or beta according to rotation axe and device orienation:
      /**
       *            | Portrait | Landscape
       *----------------------------------
       * Front/Back | Beta     | Gamma
       *----------------------------------
       * Left/Right | Gamma    | Beta
       *
       */
      var angleToCheck = beta;
      var lastValue = lastB;
      if (isLandscape() && (rotation === 'frontBack' || rotation === 'front' || rotation === 'back') ||
         !isLandscape() && (rotation === 'leftRight' || rotation === 'left' || rotation === 'right')) {
        angleToCheck = gamma;
        lastValue = lastG;
      }

      // Detect back and forward
      if ((shakeEvent.alreadyAchieve && Math.abs(angleToCheck) < angle - threshold) || 
        (!shakeEvent.alreadyAchieve && Math.abs(angleToCheck) > angle + threshold)
      ) {

        if (angleToCheck < 0 && (rotation === 'right' || rotation === 'back') ||
            angleToCheck > 0 && (rotation === 'left' || rotation === 'front')) {
          continue;
        }

        // Check if direction matches or if any direction is needed
        if (angleToCheck > lastValue && direction === 'back' && angleToCheck < 0 ||
          angleToCheck < lastValue && direction === 'back' && angleToCheck > 0 || 
          angleToCheck > lastValue && direction === 'forward' && angleToCheck > 0 ||
          angleToCheck < lastValue && direction === 'forward' && angleToCheck < 0 || 
          direction === null) {
          callback();
        }
        
        shakeEvent.alreadyAchieve = !shakeEvent.alreadyAchieve;
      }
    }
  };

  $(document).ready(function() {
    if (debug) {
      logPanel = $('<div class="ftv-log-panel"></div>')
        .css({
          width: '100px',
          height: '100px',
          border: '1px solid black',
          position: 'fixed',
          top: '1px',
          right: '1px'
        });
      $('body').append(logPanel);
    }
  });

  var log = function() {
    var msg = '';

    if (!debug) {
      return ;
    }

    for (var i = 0; i < arguments.length; i++) {
      msg += String(arguments[i]) + ' ';
    }

    logPanel.prepend(msg + '<br />');
    //console.log(msg);
  };

  var extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        if (typeof obj[prop] === 'undefined') {
          obj[prop] = arguments[i][prop];
        }
      }
    }
    return obj;
  };

  var isLandscape = function() {
    if (window.parentBody) {
      return window.parentBody.width() > window.parentBody.height();
    } else {
      return window.innerWidth > window.innerHeight;
    }
  };

  var valueWithinThreshold = function(value, center, thresold) {
    return Math.abs(value - center) < thresold;
  };

  var getCalibrationValues = function() {
    if (typeof localStorage !== "undefined" && localStorage !== null) {
      return JSON.parse(localStorage.getItem('calibrationValues'));
    } 
  };

  var setCalibrationValues = function(calibrationValues) {
    if (typeof localStorage !== "undefined" && localStorage !== null) {
      return localStorage.setItem('calibrationValues', JSON.stringify(calibrationValues));
    } 
  };

  // ==============================
  //   GLOBAL METHODS
  // ==============================
  Fliptiltshake.calibrate = function(persist) {
    calibrate = true;
    persistCalibration = persist;

    for (var type in events) {
      for (var i = 0; i < events[type].length; i++) {
        events[type][i].init();
      }
    }
  };

  Fliptiltshake.stop = function() {
    if (listener !== null) {
      window.removeEventListener('deviceorientation', deviceorientation);
      listener = null;
    }
  };

  Fliptiltshake.start = function() {
    if (listener === null) {
      firstEvent = true;
      listener = window.addEventListener('deviceorientation', deviceorientation, false);
    }
  };

  window.Fliptiltshake = Fliptiltshake;
})(this);






