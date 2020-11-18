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
    public class GunTypesController : ApiController
    {
        private GunzEntities db = new GunzEntities();

        // GET: api/GunTypes
        public IQueryable<GunType> GetGunTypes()
        {
            return db.GunTypes;
        }

        // GET: api/GunTypes/5
        [ResponseType(typeof(GunType))]
        public IHttpActionResult GetGunType(int id)
        {
            GunType gunType = db.GunTypes.Find(id);
            if (gunType == null)
            {
                return NotFound();
            }

            return Ok(gunType);
        }

        // PUT: api/GunTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGunType(int id, GunType gunType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gunType.GunTypeID)
            {
                return BadRequest();
            }

            db.Entry(gunType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GunTypeExists(id))
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

        // POST: api/GunTypes
        [ResponseType(typeof(GunType))]
        public IHttpActionResult PostGunType(GunType gunType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GunTypes.Add(gunType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gunType.GunTypeID }, gunType);
        }

        // DELETE: api/GunTypes/5
        //[ResponseType(typeof(GunType))]
        //public IHttpActionResult DeleteGunType(int id)
        //{
        //    GunType gunType = db.GunTypes.Find(id);
        //    if (gunType == null)
        //    {
        //        return NotFound();
        //    }

        //    db.GunTypes.Remove(gunType);
        //    db.SaveChanges();

        //    return Ok(gunType);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GunTypeExists(int id)
        {
            return db.GunTypes.Count(e => e.GunTypeID == id) > 0;
        }
    }
}