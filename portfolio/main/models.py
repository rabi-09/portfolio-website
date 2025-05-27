from django.db import models
from django.utils.text import slugify

class Detail(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    image = models.ImageField(upload_to="details")
    age = models.PositiveIntegerField()
    profession = models.CharField(max_length=100)
    hobby = models.CharField(max_length=200)
    experience = models.CharField(max_length=30)
    resume = models.FileField(upload_to="resume", null=True, blank=True)

    def __str__(self):
        return self.name
    
class Education(models.Model):
    academic_name = models.CharField(max_length=200)
    institution = models.CharField(max_length=255)
    stream = models.CharField(max_length=100, blank=True)
    course = models.CharField(max_length=100)
    joining_year = models.CharField(max_length=10)
    passing_year = models.CharField(max_length=10)
    mark = models.CharField(max_length=10)
    details = models.TextField(max_length=500)

    def __str__(self):
        return self.academic_name
    

class Skill(models.Model):
    name = models.CharField(max_length=200)
    percentage = models.PositiveIntegerField()
    color = models.CharField(max_length=7)
    image = models.ImageField(upload_to="skills")


    def __str__(self):
        return self.name



class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            # Ensure unique slug for Category
            while Category.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="projects")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    slug = models.SlugField(max_length=100, blank=True)
    git_link = models.CharField(max_length=500, blank=True, null=True)
    project_link = models.CharField(max_length=500, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            category_slug = self.category.slug if self.category else ''
            base_slug = slugify(f"{self.name}-{category_slug}")
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name



class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=500)

    def __str__(self):
        return self.name