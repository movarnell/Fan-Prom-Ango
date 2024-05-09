import React from "react";
import { Form } from "react-bootstrap";
import { format } from "date-fns";



export function AddMovieForm({
  format , days, movie
}) {
  return <Form>
              <div className="col-sm-12 col-md-4 col-lg-4">
                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
        className="mx-1" type="radio" id={`7pm-${movie.id}`} name={`showtime-${movie.id}`} label={`7:00 PM`} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
        className="mx-1" type="radio" id={`9pm-${movie.id}`} name={`showtime-${movie.id}`} label={`9:00 PM`} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
        className="mx-1" type="radio" id={`11pm-${movie.id}`} name={`showtime-${movie.id}`} label={`11:00 PM`} />
                  </Form.Group>
                
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                {
        /* checkboxes for day of the week */
      }
                
                  <Form.Group className="mb-3">
                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`monday-${movie.id}`} label={format(days[0], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`tuesday-${movie.id}`} label={format(days[1], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`wednesday-${movie.id}`} label={format(days[2], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`thursday-${movie.id}`} label={format(days[3], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`friday-${movie.id}`} label={format(days[4], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`saturday-${movie.id}`} label={format(days[5], "EEEE MMMM, d")} />

                    <Form.Check // prettier-ignore
        className="mx-1" type="checkbox" id={`sunday-${movie.id}`} label={days[6]} />
                  </Form.Group>
              </div>
                </Form>;
}
  