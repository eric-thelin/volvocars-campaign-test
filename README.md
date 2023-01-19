# Volvo Cars Campaign Test

This is my solution to the Volvo Cars test automation task
for [the Car safety campaign](https://www.volvocars.com/intl/v/car-safety/a-million-more).

The solution is based on [WebdriverIO](https://webdriver.io/)
and [Docker](https://www.docker.com/) and contains a simple automated test suite
for the main campaign page. The test suite does not intend to provide full
coverage of the campaign page, but rather act as a skeleton solution where more
test can be added at a later time. Here are a few of the highlights:

- [Automated tests](./test/specs) for key elements of the page, e.g. site
  navigation, footer and main contents.
- [Reusable test code](./test/pageobjects)
  using [the Page Object pattern](https://webdriver.io/docs/pageobjects).
- Visual regression testing
  using [the Image Comparison Service](https://webdriver.io/docs/wdio-image-comparison-service).
  This also includes checking the element tab order.
- [Dockerized solution](./docker-compose.yaml)
  using [Docker Compose](https://docs.docker.com/compose/) to run a Selenium
  cluster using multiple instances of Chrome and Firefox.
- Parallel test execution (This comes out of the box with the WebdriverIO test
  runner). The parallelism is defined
  in [the WebdriverIO configuration file](./wdio.conf.js), i.e. through
  the `maxInstances` properties.
- Nice test result reports
  using [Allure](https://webdriver.io/docs/allure-reporter). This includes a
  video clip of the browser action of each test failure.

Please note that I opted for a solution using Docker Compose instead of [the
suggested Kubernetes solution](https://www.swtestacademy.com/selenium-kubernetes-scalable-parallel-tests/).
Docker compose is a more lightweight solution with minimal dependencies. The
only requirement is to have Docker and Docker Compose installed on the test
host. For Kubernetes, we need minikube and a complete virtual machine.

A downside of the Docker Compose approach is that I need to
use [special Docker images](https://hub.docker.com/u/seleniarm) for the Selenium
nodes compatible with the ARM architecture of the latest Mac systems. If you are
on an older MAC or a PC, you will have to
modify [the docker compose file](./docker-compose.yaml) and
use [the regular node images for Chrome and Firefox](https://hub.docker.com/u/selenium),
i.e. [selenium/node-chrome](https://hub.docker.com/r/selenium/node-chrome)
and [selenium/node-firefox](https://hub.docker.com/r/selenium/node-firefox).

## Getting started

To bring up solution, including the Selenium cluster, we use the command below:

```
docker-compose up -d
```

This will start a Selenium cluster with one hub node and three instances each
of Chrome and Firefox. The hub is reachable
on [http://localhost:4444/ui](http://localhost:4444/ui). You may connect to the
Chrome and Firefox nodes using VNC on ports 6900-6902 and 6910-6912
respectively. This is useful for inspection of the actual browser windows as the
tests run. On Mac you can use the standard screen sharing app to connect. Please
note that the connections are protected with password 'secret'.

**Note:** We use the `-d` flag to start the compose process in the background.
This allows us to continue using the same terminal window while the solution
runs in the background.

## Running the tests

To run the tests inside the Docker Compose solution, we use the command below:

```
docker-compose exec test npx wdio
```

This will run the full test suite on the Selenium cluster. Since we have three
nodes each of browser, there will be up to six tests running in parallel.

**Note:** The first time the tests are run it will create baseline images for
the visual regression tests. On consecutive runs it will use these to compare
the actual appearance of the web page. It is possible
to [build the test docker image with the baseline images included](#bundling-baseline-images-inside-docker-image).
This might be useful when the tests are run on a CI server.

## Viewing the results

The Docker Compose solution includes an allure service that exposes the test
results on [http://localhost:8080](http://localhost:8080). However, after
running the tests you must regenerate the report. This is achieved with the
command below:

```
docker-compose restart allure
```

**Note:**
After consecutive runs, you might have to do a hard refresh in the web browser
to see the latest report.

## Local development

So far we have only discussed the Docker Compose solution. What if you want to
work on the test suite on you local development machine? This section explains
how.

```
# Start Selenium cluster
docker-compose up -d

# Install dependencies
npm install

#
# Run test suite
#
# Note: Without the environment variable the tests are run using Puppeteer and
# the devtools protocol
#
env WDIO_AUTOMATION_PROTOCOL=webdriver npx wdio

# Generate report
npx allure generate --clean allure-results/

# Open report
npx allure open
```

**Note:** `npm` requires [nodejs](https://nodejs.org/en/) to be installed
locally. In order to generate the Allure report you must also
have [Java](https://www.java.com) installed.

## Bundling baseline images inside Docker image

In order to build the test Docker image including the baseline images used for
the visual regression testing, you can run the test suite on your local
development machine before building the image, i.e.

```
# Clean existing baseline images
rm -r wic/baseline/

# Run test suite
env WDIO_AUTOMATION_PROTOCOL=webdriver npx wdio

# Rebuild and restart cluster
docker-compose down
docker-compose up -d --build
```

## Final thoughts

I noticed a strange thing when accessing the campaign page from the automated
browsers. While the initial page load works, any consecutive page load and/or
page transition fails with an "Access Denied" error. I suspect that this is due
to some automation protection running on the Volvo Cars web server. Rather than
spending time investigating and implementing a workaround, I opted for simple
tests without any page transitions. Also, I choose to have just one test
function per file to avoid the problem with multiple page loads. This made
the [campaign test](./test/specs/campaign.e2e.js) larger than I would prefer.
Ideally I would have put the visual regression test and the tab order test into
separate test functions within that file, but now it is just one large function.
