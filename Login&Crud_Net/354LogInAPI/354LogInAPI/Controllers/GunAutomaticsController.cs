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
    public class GunAutomaticsController : ApiController
    {
        private GunzEntities db = new GunzEntities();

        // GET: api/GunAutomatics
        public IQueryable<GunAutomatic> GetGunAutomatics()
        {
            return db.GunAutomatics;
        }

        // GET: api/GunAutomatics/5
        [ResponseType(typeof(GunAutomatic))]
        public IHttpActionResult GetGunAutomatic(int id)
        {
            GunAutomatic gunAutomatic = db.GunAutomatics.Find(id);
            if (gunAutomatic == null)
            {
                return NotFound();
            }

            return Ok(gunAutomatic);
        }

        // PUT: api/GunAutomatics/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGunAutomatic(int id, GunAutomatic gunAutomatic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gunAutomatic.GunAutomaticID)
            {
                return BadRequest();
            }

            db.Entry(gunAutomatic).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GunAutomaticExists(id))
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

        // POST: api/GunAutomatics
        [ResponseType(typeof(GunAutomatic))]
        public IHttpActionResult PostGunAutomatic(GunAutomatic gunAutomatic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GunAutomatics.Add(gunAutomatic);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gunAutomatic.GunAutomaticID }, gunAutomatic);
        }

        // DELETE: api/GunAutomatics/5
        //[ResponseType(typeof(GunAutomatic))]
        //public IHttpActionResult DeleteGunAutomatic(int id)
        //{
        //    GunAutomatic gunAutomatic = db.GunAutomatics.Find(id);
        //    if (gunAutomatic == null)
        //    {
        //        return NotFound();
        //    }

        //    db.GunAutomatics.Remove(gunAutomatic);
        //    db.SaveChanges();

        //    return Ok(gunAutomatic);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GunAutomaticExists(int id)
        {
            return db.GunAutomatics.Count(e => e.GunAutomaticID == id) > 0;
        }
    }
}