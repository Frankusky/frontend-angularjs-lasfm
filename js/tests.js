describe('$scope.grade', function() {
	it('should return false because pass is too short', function() {
		expect(passChecker("a")).toBe("Still Weak. Try a longer password...");
	});
	it("should return invalid message", function(){
		expect(passChecker(" asd @ ááé")).toBe("Special characters detected. Try another password...");
	});
	it("should return true", function(){
		expect(passChecker("HOLAmundo123")).toBe(true);
	});
});
