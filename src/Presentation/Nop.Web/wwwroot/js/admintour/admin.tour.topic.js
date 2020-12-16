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

  //'Title and content' step
  tour.addStep({
    title: 'Title and content',
    text: 'In these fields, enter a topic(page) title and it\'s content. This is what customers will see in the public store',
    attachTo: {
      element: '#info-area',
      on: 'bottom'
    },
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

  //'Preview the page' step
  tour.addStep({
    title: 'Preview the page',
    text: 'To know how your customers will see the page, click the <b>Preview</b> button',
    attachTo: {
      element: '#preview-topic-button',
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
    ]
  });

  tour.start();
})