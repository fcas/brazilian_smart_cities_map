from django.conf.urls import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('map.views',
    url(r'^$', 'index', name='map-index'),
)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)