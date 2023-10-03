import MockAdapter from "axios-mock-adapter"

export default function useMockServer(axiosClient){
    // Create instance of MockAdapter with access to active axiosClient
    var mock = new MockAdapter(axiosClient);

    // Create user object
    const users = [
        { id: 1, name: "John Smith" }
    ]

    // Create images object
    const images = [
        'abcd/efgh'
    ]

    // Mock requests to /users
    mock.onGet("/users").reply(200, users)
    mock.onPut("/users").reply(200, true)
    mock.onPost("/users").reply(200, true)
    mock.onDelete("/users").reply(200, true)
    
    // Mock requests to /users
    mock.onGet("/images/valid").reply(200, images[0], {"content-type": "image/jpeg"})
    mock.onGet("/images/invalid").reply(400)
    
    // Mock request to /error_400
    mock.onGet("/error_400").reply(400, false)
    mock.onPut("/error_400").reply(400, false)
    mock.onPost("/error_400").reply(400, false)
    mock.onDelete("/error_400").reply(400, false)

    // Mock request to /error_network
    mock.onGet("/error_network").networkError();
    // Mock request to /error_timeout
    mock.onGet("/error_timeout").timeout();
}