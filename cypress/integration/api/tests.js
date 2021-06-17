  describe('Authenticate', () => {
    it('returns JSON', () => {
      cy.request({
          method: 'POST',
          url: 'localhost:5003/api/authenticate',
          body: {
            "email": "test@gmail.com",
            "password": "password"
          }
      }).then((response)=>{
        var token = response.body.token
        expect(response.status).equal(200)
        expect(response.body).to.not.be.null
        cy.request({
            method: 'GET',
            url: 'localhost:5003/api/welcome',
            headers: {
                "token": token
            }
        }).then((response)=>{
            expect(response.status).equal(200)
        })
      })
    })
  })
