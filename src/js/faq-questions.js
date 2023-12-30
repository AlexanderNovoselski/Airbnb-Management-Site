document.addEventListener('DOMContentLoaded', function () {
    // Get all FAQ questions and answers
    var faqItems = document.querySelectorAll('.faq-question');

    // Add click event listener to each FAQ question
    faqItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Toggle the 'active' class to show/hide the answer
            item.classList.toggle('active');
        });
    });
});
