from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from apps.common.models import *


def default(request):
    categories = Category.objects.all()
    return {'categories': categories}
