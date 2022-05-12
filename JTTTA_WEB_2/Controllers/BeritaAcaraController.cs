using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JTTTA_WEB_2.Controllers
{
    public class BeritaAcaraController : Controller
    {
        // GET: BeritaAcara
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InsertBA()
        {
            return View();
        }
    }
}