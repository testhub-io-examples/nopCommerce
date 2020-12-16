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
    title: 'Configuration tour',
    text: 'Let us help you to configure your store! We will show you a few tips describing the most important fields for the initial configuration. During this tour, you can immediately click and edit the highlighted fields.',
    buttons: [
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Basic/Advanced mode' step
  tour.addStep({
    title: 'Basic-Advanced mode',
    text: 'This two-position "Basic-Advanced" switch allows you to switch between page display modes. For the convenience of use, we made the Basic mode where the most frequent settings are shown. If you cannot find a required setting on a page, switch to the Advanced mode to see all available settings.',
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
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Choose a theme' step
  tour.addStep({
    title: 'Choose a theme',
    text: 'On this page, you can set up a store theme. After you choose a theme on our <a href="https://www.nopcommerce.com/marketplace" target="_blank">marketplace</a>, upload it on your site following <a href="https://docs.nopcommerce.com/getting-started/design-your-store/choose-and-install-a-theme.html"  target="_blank">these instructions</a>. Then refresh this page and you will see all the allowed themes. Choose one and click the "Save" button in the top right.',
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
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ],
  });

  //'Upload your logo' step
  tour.addStep({
    title: 'Upload your logo',
    text: 'In this field, click the "Upload a file" button, then choose your logo file.',
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
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.cancel();
        },
        classes: 'button-done',
        text: 'Done',
        secondary: true
      }
    ],
  });

  tour.start();
})