from django.urls import include, path

from aigenerator import views as aigenerator_views

urlpatterns = [
    path('generate/', aigenerator_views.GenerateInterviewQuestionsAPIView.as_view(), name='generate-interview-questions'),
]