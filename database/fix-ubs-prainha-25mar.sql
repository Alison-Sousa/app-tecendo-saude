-- Fix registrations from March 25 (Prainha) that have wrong UBS
-- Sets them to "UBS São Sebastião" (default Prainha UBS)
UPDATE perfis
SET ubs_referencia = 'UBS São Sebastião',
    updated_at = NOW()
WHERE created_at::date = '2025-03-25'
  AND regiao = 'Prainha'
  AND (ubs_referencia IS NULL OR ubs_referencia = '' OR ubs_referencia NOT IN ('UBS São Sebastião', 'UBS Santa Maria do Uruará'));
