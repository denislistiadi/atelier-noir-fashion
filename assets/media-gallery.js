if (!customElements.get('media-gallery')) {
  customElements.define(
    'media-gallery',
    class MediaGallery extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          liveRegion: this.querySelector('[id^="GalleryStatus"]'),
          viewer: this.querySelector('[id^="GalleryViewer"]'),
          thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
        };
        this.mql = window.matchMedia('(min-width: 750px)');
        if (!this.elements.thumbnails) return;

        this.elements.viewer.addEventListener('slideChanged', debounce(this.onSlideChanged.bind(this), 500));
        this.elements.thumbnails.querySelectorAll('[data-target]').forEach((mediaToSwitch) => {
          mediaToSwitch
            .querySelector('button')
            .addEventListener('click', this.setActiveMedia.bind(this, mediaToSwitch.dataset.target, false));
        });
        if (this.dataset.desktopLayout.includes('thumbnail') && this.mql.matches) this.removeListSemantic();

        this.initArrowNavigation();
      }

      initArrowNavigation() {
        const prevButtons = this.querySelectorAll('.slider-button--prev');
        const nextButtons = this.querySelectorAll('.slider-button--next');

        const onArrowClick = (direction, event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.navigateMedia(direction);
        };

        prevButtons.forEach((btn) => {
          btn.addEventListener('click', onArrowClick.bind(this, -1));
          btn.removeAttribute('disabled');
        });

        nextButtons.forEach((btn) => {
          btn.addEventListener('click', onArrowClick.bind(this, 1));
          btn.removeAttribute('disabled');
        });

        // Ensure buttons stay active and not disabled by parent SliderComponent
        if (window.MutationObserver) {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                if (mutation.target.hasAttribute('disabled')) {
                  mutation.target.removeAttribute('disabled');
                }
              }
            });
          });
          prevButtons.forEach((btn) => observer.observe(btn, { attributes: true, attributeFilter: ['disabled'] }));
          nextButtons.forEach((btn) => observer.observe(btn, { attributes: true, attributeFilter: ['disabled'] }));
        }
      }

      navigateMedia(direction) {
        if (!this.elements.thumbnails) return;
        const thumbnailItems = Array.from(this.elements.thumbnails.querySelectorAll('[data-target]'));
        if (thumbnailItems.length === 0) return;

        const currentActiveIndex = thumbnailItems.findIndex((item) => {
          const btn = item.querySelector('button');
          return btn && btn.getAttribute('aria-current') === 'true';
        });

        let nextIndex;
        if (currentActiveIndex === -1) {
          nextIndex = direction > 0 ? 0 : thumbnailItems.length - 1;
        } else {
          nextIndex = currentActiveIndex + direction;
          if (nextIndex < 0) {
            nextIndex = thumbnailItems.length - 1;
          } else if (nextIndex >= thumbnailItems.length) {
            nextIndex = 0;
          }
        }

        const targetItem = thumbnailItems[nextIndex];
        if (targetItem && targetItem.dataset.target) {
          this.setActiveMedia(targetItem.dataset.target, false);
        }
      }

      onSlideChanged(event) {
        const thumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${event.detail.currentElement.dataset.mediaId}"]`
        );
        this.setActiveThumbnail(thumbnail);
      }

      setActiveMedia(mediaId, prepend) {
        const activeMedia =
          this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`) ||
          this.elements.viewer.querySelector('[data-media-id]');
        if (!activeMedia) {
          return;
        }
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach((element) => {
          element.classList.remove('is-active');
        });
        activeMedia?.classList?.add('is-active');

        if (prepend) {
          activeMedia.parentElement.firstChild !== activeMedia && activeMedia.parentElement.prepend(activeMedia);

          if (this.elements.thumbnails) {
            const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
            activeThumbnail.parentElement.firstChild !== activeThumbnail && activeThumbnail.parentElement.prepend(activeThumbnail);
          }

          if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }

        this.preventStickyHeader();
        window.setTimeout(() => {
          if (!this.mql.matches || this.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft, behavior: 'smooth' });
          }
          const activeMediaRect = activeMedia.getBoundingClientRect();
          // Don't scroll if the image is already in view
          if (activeMediaRect.top > -0.5) return;
          const top = activeMediaRect.top + window.scrollY;
          window.scrollTo({ top: top, behavior: 'smooth' });
        });
        this.playActiveMedia(activeMedia);

        if (!this.elements.thumbnails) return;
        const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
      }

      setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;

        this.elements.thumbnails
          .querySelectorAll('button')
          .forEach((element) => element.removeAttribute('aria-current'));
        thumbnail.querySelector('button').setAttribute('aria-current', true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

        this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft, behavior: 'smooth' });
      }

      announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;
        image.onload = () => {
          this.elements.liveRegion.setAttribute('aria-hidden', false);
          this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(() => {
            this.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };
        image.src = image.src;
      }

      playActiveMedia(activeItem) {
        window.pauseAllMedia();
        const deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) deferredMedia.loadContent(false);
      }

      preventStickyHeader() {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }

      removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach((slide) => slide.setAttribute('role', 'presentation'));
      }
    }
  );
}
