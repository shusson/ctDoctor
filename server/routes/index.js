import patient from './patient';
import visit from './visit';
import medication from './medication';

const routes = [patient, visit, medication];

export default function (app) {
  routes.forEach((route) => {
    app
      .use(route.routes())
      .use(route.allowedMethods({
        throw: true,
      }))
  })
}
