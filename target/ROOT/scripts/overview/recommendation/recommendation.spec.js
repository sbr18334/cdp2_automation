    ////// recommendation overview page unit-tests ///////
    describe('Recommendation page tests', function() {
        beforeEach(function(){
            element(by.css("#content #overview div:nth-child(2)")).click();
        })
        it('is on correct page', function() {
            expect(browser.getCurrentUrl()).toContain("recommendation");
        });        
        it('chart to be not present',function() {
            expect(element(by.css('#chart')).isDisplayed()).toBe(false);
        })
    })