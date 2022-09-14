import './style.css';
import Boot from '$lib/Boot.svelte';
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const main = async () => {
  await initLocale();

  new Boot({
    target: document.getElementById('app'),
  });
};

const initLocale = async () => {
  register('en', () => import('$lib/i18n/en.json' as string));
  register('ru', () => import('$lib/i18n/ru.json' as string));

  await init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
};

main();
