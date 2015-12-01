from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from tinymce.models import HTMLField


class Category(models.Model):
    title = models.CharField(_('Category name'), max_length=255, unique=True)

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ['title', ]


class Tutorial(models.Model):
    title = models.CharField(_('Tutorial title'), max_length=255, unique=True)
    category = models.ForeignKey(Category)
    author = models.ForeignKey(User)
    publish_date = models.DateTimeField(null=True)
    short_description = HTMLField(max_length=255)

    class Meta:
        verbose_name = _('Tutorial')
        verbose_name_plural = _('Tutorials')
        ordering = ['publish_date', ]


class Section(models.Model):
    tutorial = models.ForeignKey(Tutorial)
    title = models.CharField(_('Section title'), max_length=255)
    content = HTMLField(_('Section content'), help_text=_('Section content help'))
    order = models.IntegerField(_('Section order'))

    class Meta:
        verbose_name = _('Section')
        verbose_name_plural = _('Sections')
        ordering = ['order', ]

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

