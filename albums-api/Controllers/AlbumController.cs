using albums_api.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]



    /// <summary>
    /// Controller for handling album-related API requests.
    /// Provides endpoints to retrieve album information, including sorting and filtering capabilities.
    /// Endpoints:
    /// - GET /albums: Retrieves a list of albums, optionally sorted by a specified field
    /// - GET /albums/{id}: Retrieves details of a specific album by its ID
    /// The controller interacts with the Album model to fetch and manipulate album data, returning appropriate HTTP responses based on the request and data availability.
    /// The controller is designed to be part of a RESTful API, adhering to standard conventions for resource management and response handling.
    /// The controller is decorated with attributes to define routing and API behavior, making it easy to integrate into an ASP.NET Core application.
    /// </summary>
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get([FromQuery] string? sortBy)
        {
            var albums = Album.GetAllSorted(sortBy);

            return Ok(albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);

            if (album is null)
            {
                return NotFound();
            }

            return Ok(album);
        }

    }
}
