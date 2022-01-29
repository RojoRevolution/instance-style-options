window.addEventListener('DOMContentLoaded', function () {


    // BVC Specific Buttons
    const progressPanel = document.getElementById('test-progress');
    const resultsPanel = document.getElementById('test-results');
    const testBtn = document.getElementById('open-test');
    const continueBtn = document.getElementById('show-results');
    const closeResultsBtn = document.getElementById('close-test');
    const hiddenControls = document.getElementById('dynamic-controls');


    testBtn.addEventListener('click', openTestPanel)
    continueBtn.addEventListener('click', continueTest)
    closeResultsBtn.addEventListener('click', closeTest)

    function openTestPanel() {
        progressPanel.classList.toggle('hide');
        testBtn.classList.toggle('hide');
        continueBtn.classList.toggle('hide');
        hiddenControls.classList.toggle('hide');
    }

    function continueTest() {
        progressPanel.classList.toggle('hide');
        resultsPanel.classList.toggle('hide');
        continueBtn.classList.toggle('hide');
        closeResultsBtn.classList.toggle('hide');
    }

    function closeTest() {
        resultsPanel.classList.toggle('hide');
        closeResultsBtn.classList.toggle('hide');
        testBtn.classList.toggle('hide');
        hiddenControls.classList.toggle('hide');
    }

})