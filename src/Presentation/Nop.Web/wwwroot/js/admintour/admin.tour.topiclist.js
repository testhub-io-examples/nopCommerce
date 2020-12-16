$(document).ready(function () {
  $('#topics-grid').on('draw.dt', function () {
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

    //'Topics (pages)' step
    tour.addStep({
      title: 'Topics (pages)',
      text: 'Topics (pages) are free-form content blocks that can be displayed on your site, either embedded within other pages or on a page of their own. These are often used for FAQ pages, policy pages, special instructions, and so on',
      attachTo: {
        element: '#topics-area',
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

    //'Topics (pages)' step
    tour.addStep({
      title: 'Topics (pages)',
      text: 'In this table you can see a list of the topics created by default',
      attachTo: {
        element: '#topics-area',
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

    var shippingTopicRowId = 'row_shippinginfo';

    //'Shipping info' step
    tour.addStep({
      title: 'Shipping info',
      text: 'For example, this is a <b>shipping info</b> topic. It contains shipping information that customers can access by clicking the appropriate link in your store',
      attachTo: {
        element: '#' + shippingTopicRowId,
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

    //'Link location' step
    tour.addStep({
      title: 'Page link location',
      text: 'As you can see, this topic is included in the first column of the footer',
      attachTo: {
        element: '#' + shippingTopicRowId + ' .column-footer-column1',
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

    //'Edit the page' step
    tour.addStep({
      title: 'Edit the page',
      text: 'To edit this page click this <b>Edit</b> button. You can also create a new topic by clicking the <b>Add new</b> button at the top of the page',
      attachTo: {
        element: '#' + shippingTopicRowId + ' .column-edit .btn',
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
  });
})