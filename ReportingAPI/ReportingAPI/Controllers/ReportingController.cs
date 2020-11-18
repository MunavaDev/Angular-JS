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
using ReportApi.Models;
using System.Dynamic;
using System.IO;
using System.Web.Hosting;
using System.Net.Http.Headers;
using System.Web.Http.Cors;
using CrystalDecisions.CrystalReports.Engine;
using System.Web;
using System.Web.Mvc;
using RouteAttribute = System.Web.Http.RouteAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using System.Globalization;

namespace Report.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReportController : ApiController
    {


        [Route("api/report/GetReportData")]
        [HttpGet]

        public dynamic GetReportData(int SelectedOptionID)
        {
            NorthwindEntities db = new NorthwindEntities();
            db.Configuration.ProxyCreationEnabled = false;
            List<Product> products = new List<Product>();

            switch (SelectedOptionID)
            {
                case 1:
                    products = db.Products.Include(z => z.ProductID).Include(z => z.QuantityPerUnit).Include(z => z.UnitsInStock).ToList();
                    break;
                case 2:
                    products = db.Products.Include(z => z.ProductID).Include(z => z.QuantityPerUnit).Include(z => z.UnitsOnOrder).ToList();
                    break;
                case 3:
                    products = db.Products.Include(z => z.ProductID).Include(z => z.QuantityPerUnit).Include(z => z.UnitsInStock).Include(z => z.UnitsOnOrder).ToList();
                    break;
                default:
                    break;
            }
            return GetReportObject(products);

        }
        public dynamic GetReportObject(List<Product> products)
        {

            dynamic toReturn = new ExpandoObject();
            toReturn.ChartData = null;
            toReturn.TableData = null;

            var prodlist = products.GroupBy(z => z.ProductName);
            List<dynamic> product1 = new List<dynamic>();
            foreach (var item in prodlist)
            {
                dynamic product = new ExpandoObject();
                product.Name = item.Key;
                var avg = Convert.ToDouble(item.Average(z => z.UnitPrice), CultureInfo.InvariantCulture);
                product.Average = Math.Round(avg, 2);


                product1.Add(product);
            }

            var products2 = products.GroupBy(Z => Z.ProductName);
            List<dynamic> ProductGroups = new List<dynamic>();
            foreach (var item in products2)
            {
                dynamic prodct = new ExpandoObject();
                prodct.ProductName = item.Key;
                var avg = Convert.ToDouble(item.Average(z => z.UnitPrice), CultureInfo.InvariantCulture);
                prodct.Average = Math.Round(avg, 2);
                List<dynamic> Products = new List<dynamic>();
                foreach (var productitem in item)
                {
                    dynamic productObject = new ExpandoObject();
                    productObject.Product = productitem.ProductName;
                    productObject.Product = productitem.UnitPrice;
                    productObject.Product = productitem.QuantityPerUnit;
                    Products.Add(productObject);
                }
                prodct.Products = Products;
                ProductGroups.Add(prodct);
            }


            toReturn.ChartData = product1;
            toReturn.TableData = ProductGroups;
            return toReturn();
        }


    }
}