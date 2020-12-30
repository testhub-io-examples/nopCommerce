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

    var nextButton = {
      action() {
        return tour.next();
      },
      classes: 'button-next',
      text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
    };

    var backButton = {
      action() {
        return tour.back();
      },
      classes: 'button-back',
      text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
    };

    var doneButton = {
      action() {
        return tour.cancel();
      },
      classes: 'button-done',
      text: LocalResourcesProvider.localized_data.Done,
      secondary: true
    };		

    //'Topics (pages)' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TopicListTopics1Title,
      text: LocalResourcesProvider.localized_data.TopicListTopics1Text,
      attachTo: {
        element: '#topics-area',
        on: 'bottom'
      },
      buttons: [nextButton]
    });

    //'Topics (pages)' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TopicListTopics2Title,
      text: LocalResourcesProvider.localized_data.TopicListTopics2Text,
      attachTo: {
        element: '#topics-area',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    var shippingTopicRowId = 'row_shippinginfo';

    //'Shipping info' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TopicListShippingTitle,
      text: LocalResourcesProvider.localized_data.TopicListShippingText,
      attachTo: {
        element: '#' + shippingTopicRowId,
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Link location' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TopicListLocationTitle,
      text: LocalResourcesProvider.localized_data.TopicListLocationText,
      attachTo: {
        element: '#' + shippingTopicRowId + ' .column-footer-column1',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Edit the page' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TopicListEditTitle,
      text: LocalResourcesProvider.localized_data.TopicListEditText,
      attachTo: {
        element: '#' + shippingTopicRowId + ' .column-edit .btn',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})