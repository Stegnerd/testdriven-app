// visit means to simulate naviaget to that route
describe('Index', () => {
    it('users should be able to view the "/" page', () => {
    cy
    .visit('/')
    .get('h1').contains('All Users');
    });
});