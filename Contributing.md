# Contributing

## Coding Style

- See [CodingStyle](CodingStyle.md)

## Branching
- New features must be implemented in a feature branch. The development and master branches are protected
- Clone to repository
	```bash
    git clone https://github.com/kmiller92/codepods-demographics-server.git
    cd codepods-demographics-server
    ```

- Create a new feature branch
	```bash
    git checkout -b {{FeatureBranchName}}
    ```
	- This will create a new branch and switch your local repository to it
- Update the src/test directory with unit tests for your update
	- [Mocha and Chai](https://mochajs.org/#getting-started)
- Ensure all tests pass
	-     yarn test
- Ensure coding style is adhered to by running eslint
	-     yarn lint
- If modifying the API, update apidoc.json with new version and api changes
	- Copy current api documentation to the previous api documentation file
		-     git mv apidoc.json _apidoc.json

## Pull Request Process
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
- Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is SemVer.
- The Pull Request will be merged once the code is reviewed and tested by the owners

## Resources
### Testing
-  [Testing Node.js with Mocha and Chai](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wp048OjwaUk)
-  [Unit Test Your Javascript Using Mocha and Chai](https://www.sitepoint.com/unit-test-javascript-mocha-chai/)

### Express
[Mozilla Express Documentation](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

### Documentation
[ApiDoc](http://apidocjs.com/)

### General
[DevelopmentNotes](DevelopmentNotes.md)