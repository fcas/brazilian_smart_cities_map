from django.conf.urls import *

urlpatterns = patterns('map.views',
    url(r'^$', 'index', name='map-index'),
)
