from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, get_object_or_404
from django.template import RequestContext
from apps.common.models import *

def login(request):
    pass


@login_required
def profile(request):
    pass


def author_detail(request, author):
    pass


def index(request):
    tutorials = Tutorial.objects.all()[:10]
    return render_to_response('common/master.html', {
        'tutorials': tutorials,
    }, context_instance=RequestContext(request))


def category_detail(request, category_title):
    pass


def tutorial_detail(request, tutorial_title):
    pass


def section_detail(request, tutorial_title, section_title):
    section = get_object_or_404(Section, title=section_title, tutorial__title=tutorial_title)
    tutorial = Tutorial.objects.prefetch_related('section_set').get(title=tutorial_title)
    print(section.content)
    return render_to_response('common/section_detail.html', {
        'section': section,
        'tutorial': tutorial
    }, context_instance=RequestContext(request))

