from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404

from .models import Review, Promo, News


def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contacts(request):
    return render(request, 'mainapp/contacts.html')
def news(request):
    return render(request, 'news.html')

def article_view(request, article_id):
    article = get_object_or_404(News, pk=article_id)
    return render(request, 'article.html', {'article': article})

def vocabulary(request):
    return render(request, 'vocabulary.html')

def contacts(request):
    return render(request, 'contacts.html')

def vacancies(request):
    return render(request, 'vacancies.html')
def js(request):
    return render(request, 'js.html')
def dates(request):
    return render(request, 'dates.html')
def classes(request):
    return render(request, 'class.html')
def feedback(request):
    return render(request, 'feedback.html', context={'reviews': Review.objects.all()})

def promo_page(request):
    return render(request, 'promo.html', {'active_promo_codes': Promo.objects.filter(archived=False),
                                          'archived_promo_codes': Promo.objects.filter(archived=True)})
def check_promo(request):
    promo_code = request.GET.get('promo_code')
    print('asd')
    try:
        promo = Promo.objects.get(promo=promo_code, archived=False)
        response_data = {'valid': True, 'percentage': promo.percentage}
    except Promo.DoesNotExist:
        response_data = {'valid': False}

    return JsonResponse(response_data)
def news_list(request):
    news = News.objects.order_by('-created_at')
    return render(request, 'news.html', {'news': news})