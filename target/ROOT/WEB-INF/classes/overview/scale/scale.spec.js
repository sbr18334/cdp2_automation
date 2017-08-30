    ////// scale overview page unit-tests ///////
    describe('Scale overview tests', function(){
        beforeEach(function(){
            element(by.css("#content #overview div:nth-child(4)")).click();
        })
        it('is on correct page', function() {
            expect(browser.getCurrentUrl()).toContain("scale");
        });
        it('chart to be not present',function() {
            expect(element(by.css('#chart')).isDisplayed()).toBe(false);          
        })
    })