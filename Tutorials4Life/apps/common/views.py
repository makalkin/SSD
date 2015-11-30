from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
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
    categories = Category.objects.all()
    return render_to_response('common/master.html', {'categories': categories}, context_instance=RequestContext(request))


def category_detail(request, category_title):
    pass


def tutorial_detail(request, tutorial_title):
    pass


def section_detail(request, tutorial_title, section_title):
    pass

