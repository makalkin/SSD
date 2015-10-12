from django.db import models


class Category:
    name = models.SlugField()
    description = models