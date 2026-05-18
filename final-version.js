<script>
window.addEventListener("load", async () => {
  const container = document.getElementById("courses-container");
  if (!container) return;

  const ACADEMY_BASE_URL = "https://academy.celonis.com/courses/";

  const userId =
  window.CONF?.preload?.currentUser?.currentUser?.id ??
  window.CONF?.preload?.currentUser?.id ??
  null;

  const API_URL = `https://learner-progress.eu-1.celonis.cloud/ems-automation/public/api/root/7b4832b3-aab1-4adb-9d72-76312e509d1f/hook/7a383u2a5tudy7596fx4pv99lphq3w6i?id=${encodeURIComponent(
    userId
  )}`;

  const DEFAULT_COURSES = [
    {
      title: "The Celonis Kickstarter",
      description: "Get started with Celonis and learn the basics.",
      slug: "celonis-kickstarter-1",
      assetURL:
        "https://d3i9g4671ronu3.cloudfront.net/thoughtindustries-eu/image/upload/a_exif,c_fill,w_675,h_380/v1/course-uploads/1cc62825-20df-4077-8216-a9df1132a5ad/f6p7apygtbr5-course_Kickstarterspeedometer_detail800x450.png",
    },
    {
      title: "Object-Centric Process Mining: Foundations",
      description: "Learn the foundations of object-centric process mining.",
      slug: "object-centric-process-mining-foundations-1",
      assetURL:
        "https://d3i9g4671ronu3.cloudfront.net/thoughtindustries-eu/image/upload/a_exif,c_fill,w_675,h_380/v1/course-uploads/1cc62825-20df-4077-8216-a9df1132a5ad/5lrb0rtten3d-course_Tryout_detail800x450.png",
    },
    {
      title: "Introduction to Celonis Apps and Views",
      description: "Understand how apps and views work in Celonis.",
      slug: "introduction-to-celonis-apps-and-views",
      assetURL:
        "https://d3i9g4671ronu3.cloudfront.net/thoughtindustries-eu/image/upload/a_exif,c_fill,w_675,h_380/v1/course-uploads/1cc62825-20df-4077-8216-a9df1132a5ad/qlg9byh2m7of-course_Game_detail800x450.png",
    },
{
  title: "Interact with Charts and Tables in Views",
  description: "Learn how to use charts and tables in a View.",
  slug: "interact-with-charts-and-tables-in-views",
  assetURL: "https://d3i9g4671ronu3.cloudfront.net/thoughtindustries-eu/image/upload/a_exif,c_fill,w_800,h_450/v1/course-uploads/1cc62825-20df-4077-8216-a9df1132a5ad/10p5whhkj929-course_Product_detail800x450.png"
},
  ];

  showSkeleton();

  // ===== FETCH =====
  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const courses = await res.json();

const invalidCourse =
  !Array.isArray(courses) ||
  courses.length === 0 ||
  courses.some((course) => {
    return (
      !course ||
      !course.title ||
      !course.description ||
      !course.slug ||
      !course.assetURL
    );
  });

if (invalidCourse) {
  console.warn("API returned incomplete or invalid data");
  render(DEFAULT_COURSES);
  return;
}

render(courses);
  } catch (err) {
    console.error("API error:", err);
    render(DEFAULT_COURSES);
  }

  // ===== RENDER =====
  function render(courses) {
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    courses.slice(0, 4).forEach((course) => {
      const item = document.createElement("a");
      item.className = "recommendation-widget-item";
      item.href = `${ACADEMY_BASE_URL}${course.slug}`;

      item.innerHTML = `
        <div class="container-img">
          <img src="${course.assetURL}" alt="${course.title}" loading="lazy">
        </div>
        <div class="container-content">
          <h4>${course.title}</h4>
          <p>${course.description}</p>
        </div>
      `;

      fragment.appendChild(item);
    });

    container.appendChild(fragment);
  }

  // ===== SKELETON =====
  function showSkeleton() {
    container.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const sk = document.createElement("div");
      sk.className = "skeleton-card";
      container.appendChild(sk);
    }
  }
});
</script> 
