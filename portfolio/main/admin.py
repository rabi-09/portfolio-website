from django.contrib import admin
from .models import Detail, Education, Contact, Skill, Category, Project

# Register your models here.
admin.site.register(Detail)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Contact)


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'slug')

admin.site.register(Category, CategoryAdmin)

