    ////// mau page unit-tests ///////
    describe('MAU page tests', function() {
        beforeEach(function(){
            element(by.css("#content #overview div:nth-child(3)")).click();
        })
        it('is on correct page', function() {
            expect(browser.getCurrentUrl()).toContain("mau");
        });
        it('chart to be not present',function() {
            expect(element(by.css('#chart')).isDisplayed()).toBe(false);
        })
    })