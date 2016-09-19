describe('blackSwanController', function() {
  var $httpBackend;
  var $rootScope;
  var createController;
  var scope;

  beforeEach(module('blackSwanApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    createController = function() {
      scope = $rootScope.$new();
      return $controller('blackSwanController', {'$scope': scope});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initailize the scores scope', function() {
    createController();
    expect(scope.scores).toBeDefined();
  });

  it('should test one valid word in dictionary', function() {
    createController();
    scope.newWord = 'black';
    scope.checkInput();
    expect(scope.displayComment).toBe('You have 5 points for the word black');
  });

  it('should test one valid word in dictionary and test if the number of unique letters is correct', function() {
    createController();
    scope.newWord = 'eleven';
    scope.checkInput();
    expect(scope.displayComment).toBe('You have 4 points for the word eleven');
  });

  it('should test one invalid word in dictionary', function() {
    createController();
    scope.newWord = 'future';
    scope.checkInput();
    expect(scope.displayComment).toBe('The word future is not in the dictionary! Please type another one!');
  });
});
