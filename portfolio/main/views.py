from django.shortcuts import redirect, render
from .models import Contact, Education, Skill, Detail, Category, Project


def index(request):
    education = Education.objects.all()
    skills = Skill.objects.all()
    details = Detail.objects.first()
    projects = Project.objects.all()
    category = Category.objects.all()
    context = {
        'educations' : education,
        'skills' : skills,
        'details' : details,
        'projects' : projects,
        'category' : category,
    }
    return render(request, 'index.html', context)


def submit_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject', '')
        message = request.POST.get('message')

        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )

        return redirect('index') 
    return redirect('index')