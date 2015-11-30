from django.contrib import admin

from apps.common.models import *



class CategoryAdmin(admin.ModelAdmin):
    model = Category

admin.site.register(Category, CategoryAdmin)


class SectionInline(admin.TabularInline):
    model = Section


class TutorialAdmin(admin.ModelAdmin):
    model = Tutorial
    inlines = [SectionInline]

admin.site.register(Tutorial, TutorialAdmin)



