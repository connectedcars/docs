const CCApi = require('./connectedcarsapi')

const example = async () => {
  const getFirstname = `query Viewer {
                      viewer {
                        id
                        email
                        firstname
                      }
                    }`

  try {
    const result = await CCApi.call(getFirstname)
    console.log(result.viewer.firstname)
    const addFirstname = `mutation UpdateUser{
      updateUser(input: {id: ${result.viewer.id}, firstname: "api-tester"} ) {
        id
        firstname
      }
    }`
    const secondResult = await CCApi.call(addFirstname)
    console.log(secondResult.updateUser.firstname)
  } catch (err) {
    console.error('Error during CC api call')
    console.error(err)
  }
}

example()
