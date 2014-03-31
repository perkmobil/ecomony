app.factory('Entries', ['$resource', function($resource)
{
    return $resource('http://localhost:8000/entries/:id',
            {id: '@_id'},
            {
              list: { method: 'GET', isArray:true},
              remove: { method: 'DELETE'},
              update: { method: 'PUT', params: {id: '@_id'}},
              create: { method: 'POST' }
            });
}]);
