import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/eventdetail.css";
import { Link } from "react-router-dom";

export const EventDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const event = store.events.find((ev) => ev.id === parseInt(id));

  if (!event) {
    return <p>Event not found or still loading...</p>;
  }

  const isFavorite = store.favorites.some((fav) => fav.event_id === parseInt(id));

  return (
    <div className="event-card container">
      <div className="row mt-5">
        <div className="col-lg-6">
          <img
            className="img-fluid"
            alt={event.title}
            src={
              event.image ||
              "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
          />
        </div>
        <div className="col-lg-6">
          <div className="title-icon d-flex align-items-center justify-content-between">
            <h1 className="mb-0">{event.title}</h1>
            <i
              className={`fa-regular ${
                isFavorite ? "fa-solid fa-star text-warning" : "fa-star"
              }`}
              onClick={() =>
                isFavorite
                  ? actions.removeFavorite(store.favorites.find((fav) => fav.event_id === parseInt(id)).id)
                  : actions.addFavorite(store.user.id, parseInt(id))
              }
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="mt-2">
            <h3>{event.description}</h3>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <p>
                <strong>Location:</strong> {event.location}
              </p>
            </div>
            <div className="col-4">
              <p>
                <strong>Date:</strong> {event.date}
              </p>
            </div>
            <div className="col-4">
              <p>
                <strong>Time:</strong> {event.time}
              </p>
            </div>
          </div>
          <div className="event-date-time mt-3">
            {event.date && event.time ? (
              (() => {
                const dateParts = event.date.split("-");
                const dateObject = new Date(
                  `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                );
                const formattedTime = new Date(
                  `1970-01-01T${event.time}Z`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div>
                    {dateObject.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    {formattedTime}
                  </div>
                );
              })()
            ) : (
              "Invalid Date or Time"
            )}
          </div>
          <div className="mt-3">
            <Link to={`/profile/${event.creator_id}`}>
              Ir al perfil del creador
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <img
            className="img-fluid w-100"
            alt="Map Banner"
            style={{ height: "20vh", objectFit: "cover" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Location_map_Madrid.png/671px-Location_map_Madrid.png"
          />
        </div>
      </div>
    </div>
  );
};
