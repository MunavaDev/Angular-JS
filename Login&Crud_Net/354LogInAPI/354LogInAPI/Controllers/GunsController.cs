using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using _354LogInAPI.Models;

namespace _354LogInAPI.Controllers
{
    public class GunsController : ApiController
    {
        private GunzEntities db = new GunzEntities();

        // GET: api/Guns
        public IQueryable<Gun> GetGuns()
        {
            return db.Guns;
        }

        // GET: api/Guns/5
        [ResponseType(typeof(Gun))]
        public IHttpActionResult GetGun(int id)
        {
            Gun gun = db.Guns.Find(id);
            if (gun == null)
            {
                return NotFound();
            }

            return Ok(gun);
        }

        // PUT: api/Guns/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGun(int id, Gun gun)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gun.GunID)
            {
                return BadRequest();
            }

            db.Entry(gun).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GunExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Guns
        [ResponseType(typeof(Gun))]
        public IHttpActionResult PostGun(Gun gun)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Guns.Add(gun);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gun.GunID }, gun);
        }

        // DELETE: api/Guns/5
        [ResponseType(typeof(Gun))]
        public IHttpActionResult DeleteGun(int id)
        {
            Gun gun = db.Guns.Find(id);
            if (gun == null)
            {
                return NotFound();
            }

            db.Guns.Remove(gun);
            db.SaveChanges();

            return Ok(gun);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GunExists(int id)
        {
            return db.Guns.Count(e => e.GunID == id) > 0;
        }
    }
}