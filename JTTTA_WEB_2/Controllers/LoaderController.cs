using JTTTA_WEB_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JTTTA_WEB_2.Controllers
{
    public class LoaderController : Controller
    {
        DBContextDataContext db = new DBContextDataContext();

        public ActionResult GetLoader()
        {
            try
            {
                var listLoader = new List<LoaderModel>();
                

                var getLoader = db.VW_R_INDEX_LOADERs.OrderByDescending(x => x.PUNIT_STARTDATE);

                foreach (var item in getLoader)
                {
                    var loaderData = new LoaderModel();

                    loaderData.PUNIT_STARTDATE = item.PUNIT_STARTDATE;
                    loaderData.PUNIT_ENDDATE = item.PUNIT_ENDDATE;
                    loaderData.PUNIT_PLANNING_ID = item.PUNIT_PLANNING_ID;
                    loaderData.PUNIT_RAW_ID = item.PUNIT_RAW_ID;
                    loaderData.PUNIT_LOADER = item.PUNIT_LOADER;
                    loaderData.PUNIT_ISACTIVE = item.PUNIT_ISACTIVE == 1 ? "Aktif" : "Non-Aktif";

                    listLoader.Add(loaderData);
                }                

                return Json(new { Total = listLoader.Count(), Data = listLoader });
            }
            catch (Exception e)
            {
                return this.Json(new { error = e.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetLoaderEdit(string idLoader)
        {
            try
            {
                var tbl = db.TBL_R_LOADERs.Where(x => x.PUNIT_RAW_ID.Equals(idLoader)).FirstOrDefault();

                return Json(new { status = true, Data = tbl });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CreateLoader(TBL_R_LOADER input)
        {
            try
            {
                bool flag = true;
                //validation

                var message = "";

                //validasi pemilihan tanggal loader



                //validasi jam beririsan
                var getLoader = db.TBL_R_LOADERs.Where(x => x.PUNIT_PLANNING_ID == input.PUNIT_PLANNING_ID && x.PUNIT_LOADER.ToUpper() == input.PUNIT_LOADER.ToUpper());

                foreach (var item in getLoader)
                {
                    if ((input.PUNIT_STARTDATE <= item.PUNIT_STARTDATE || input.PUNIT_STARTDATE >= item.PUNIT_STARTDATE) && ((input.PUNIT_ENDDATE <= item.PUNIT_ENDDATE || input.PUNIT_ENDDATE >= item.PUNIT_ENDDATE)))
                    {
                        flag = false;
                        message = "Terdapat Loader Sedang Beroperasi";
                    } 
                }

                if (flag)
                {
                    TBL_R_LOADER model = new TBL_R_LOADER();

                    model.PUNIT_RAW_ID = Guid.NewGuid().ToString();
                    model.PUNIT_PLANNING_ID = input.PUNIT_PLANNING_ID;
                    model.PUNIT_LOADER = input.PUNIT_LOADER;
                    model.PUNIT_STARTDATE = input.PUNIT_STARTDATE;
                    model.PUNIT_ENDDATE = input.PUNIT_ENDDATE;

                    db.TBL_R_LOADERs.InsertOnSubmit(model);
                    db.SubmitChanges();

                    return Json(new { status = true, remark = "Data Loader Berhasil Disimpan!" });
                }
                else
                {
                    return Json(new { status = false, remark = message });
                }
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateLoader(TBL_R_LOADER item)
        {
            try
            {
                TBL_R_LOADER model = db.TBL_R_LOADERs.Where(x => x.PUNIT_RAW_ID.Equals(item.PUNIT_RAW_ID)).FirstOrDefault();

                model.PUNIT_PLANNING_ID = item.PUNIT_PLANNING_ID;
                model.PUNIT_LOADER = item.PUNIT_LOADER;
                model.PUNIT_STARTDATE = item.PUNIT_STARTDATE;
                model.PUNIT_ENDDATE = item.PUNIT_ENDDATE;

                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Loader Berhasil Diubah!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteLoader(TBL_R_LOADER item)
        {
            try
            {
                TBL_R_LOADER model = db.TBL_R_LOADERs.Where(x => x.PUNIT_RAW_ID.Equals(item.PUNIT_RAW_ID)).FirstOrDefault();

                db.TBL_R_LOADERs.DeleteOnSubmit(model);
                db.SubmitChanges();

                return Json(new { status = true, remark = "Data Loader Berhasil Dihapus!" });
            }
            catch (Exception ex)
            {
                return this.Json(new { error = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}