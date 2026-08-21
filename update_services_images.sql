-- Correção rápida: Voltando as URLs de imagens de portfólio originais na página de Serviços.
UPDATE public.services
SET image = '/projects/galleries/festa pessego/25DEL00836.jpg'
WHERE number = '01';

UPDATE public.services
SET image = '/projects/galleries/expo 24/DJI_20240825170948_0471_D.jpg'
WHERE number = '02';

UPDATE public.services
SET image = '/projects/galleries/services-advertising.png'
WHERE number = '03';

UPDATE public.services
SET image = '/projects/galleries/iratrail/DJI_0653.jpg'
WHERE number = '04';

UPDATE public.services
SET image = '/projects/galleries/services-website.png'
WHERE number = '05';
