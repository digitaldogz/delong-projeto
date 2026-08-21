const fs = require('fs');
let file = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

file = file.replace(/contato@cesardelong\.com/g, '{config.contact_email}');
file = file.replace(/"mailto:\{config\.contact_email\}"/g, '`mailto:${config.contact_email}`');

file = file.replace(/https:\/\/www\.instagram\.com\/cesardelong\//g, '{config.instagram_url}');
file = file.replace(/"\{config\.instagram_url\}"/g, '{config.instagram_url}');

file = file.replace(/5542999277578/g, '{config.whatsapp_number}');
file = file.replace(/"https:\/\/wa\.me\/\{config\.whatsapp_number\}"/g, '`https://wa.me/${config.whatsapp_number}`');
file = file.replace(/>\(42\) 99927-7578</g, '>{config.whatsapp_number}<');

fs.writeFileSync('src/components/Footer.tsx', file);
