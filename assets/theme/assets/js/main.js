/**
 * Spirit Satellite — фронтенд без зависимостей.
 */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {

		/* --- Шапка при скролле --- */
		var header = document.getElementById('site-header');

		function onScroll() {
			if (!header) {
				return;
			}
			header.classList.toggle('is-stuck', window.scrollY > 40);
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		/* --- Мобильное меню --- */
		var toggle = document.getElementById('nav-toggle');
		var nav = document.getElementById('site-nav');

		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = nav.classList.toggle('is-open');
				toggle.classList.toggle('is-open', open);
				toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
				document.body.style.overflow = open ? 'hidden' : '';
			});

			nav.addEventListener('click', function (e) {
				if (e.target.closest('a')) {
					nav.classList.remove('is-open');
					toggle.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
					document.body.style.overflow = '';
				}
			});

			document.addEventListener('keydown', function (e) {
				if ('Escape' === e.key && nav.classList.contains('is-open')) {
					toggle.click();
				}
			});
		}

		/* --- FAQ-аккордеон --- */
		document.querySelectorAll('.faq__q').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var item = btn.closest('.faq__item');
				var panel = item.querySelector('.faq__a');
				var open = item.classList.toggle('is-open');

				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
				panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '';
			});
		});

		/* --- Появление блоков при прокрутке --- */
		var reveals = document.querySelectorAll('.reveal');

		if (!('IntersectionObserver' in window)) {
			reveals.forEach(function (el) {
				el.classList.add('is-visible');
			});
			return;
		}

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

		reveals.forEach(function (el) {
			io.observe(el);
		});

		/* --- Подсветка активного пункта меню при скролле по якорям --- */
		var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
		var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href*="#"]'));

		if (!sections.length || !links.length) {
			return;
		}

		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				links.forEach(function (link) {
					var li = link.parentElement;
					var isMatch = link.hash === '#' + entry.target.id;

					if (li) {
						li.classList.toggle('is-active', isMatch);
					}
				});
			});
		}, { rootMargin: '-45% 0px -50% 0px' });

		sections.forEach(function (section) {
			spy.observe(section);
		});
	});
})();
