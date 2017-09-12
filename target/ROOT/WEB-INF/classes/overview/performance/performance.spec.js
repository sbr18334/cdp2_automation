////// performance overview page unit-tests ///////
    describe('Performance page tests', function() {
	    beforeEach(function(){
	        browser.get('/ROOT/#/overview');
	    })
        it('is on correct page', function() {
            expect(browser.getCurrentUrl()).toContain("performance");
        });
        it('chart to be present', function() {
            expect(element(by.css('#chart')).isDisplayed()).toBe(true);
        })
    })