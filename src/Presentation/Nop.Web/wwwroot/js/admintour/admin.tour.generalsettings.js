$(document).ready(function () {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      popperOptions: {
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 15],
          },
        }],
      },
      classes: 'admin-area-tour',
      cancelIcon: {
        enabled: true
      },
      modalOverlayOpeningPadding: '3',
      scrollTo: { behavior: 'smooth', block: 'center' },
      when: {
        show() {
          const currentStepElement = tour.currentStep.el;
          const header = currentStepElement.querySelector('.shepherd-header');
          const progress = document.createElement('span');
          progress.className = "shepherd-progress";
          progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1}/${tour.steps.length}`;
          header.insertBefore(progress, currentStepElement.querySelector('.shepherd-title'));
        }
      }
    }
  });

  //'Welcome' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.PersonalizeStoreIntroTitle,
    text: LocalResourcesProvider.localized_data.PersonalizeStoreIntroText,
    buttons: [
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Basic/Advanced mode' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.PersonalizeStoreBasicAdvancedTitle,
    text: LocalResourcesProvider.localized_data.PersonalizeStoreBasicAdvancedText,
    attachTo: {
      element: '.onoffswitch',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Choose a theme' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.PersonalizeStoreThemeTitle,
    text: LocalResourcesProvider.localized_data.PersonalizeStoreThemeText,
    attachTo: {
      element: '#theme-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ],
  });

  //'Upload your logo' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.PersonalizeStoreLogoTitle,
    text: LocalResourcesProvider.localized_data.PersonalizeStoreLogoText,
    attachTo: {
      element: '#logo-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
      },
      {
        action() {
          return tour.cancel();
        },
        classes: 'button-done',
        text: LocalResourcesProvider.localized_data.Done,
        secondary: true
      }
    ],
  });

  tour.start();
})