import app from "../app";
import request from "supertest";

describe("CV Service", () => {
  it("should convert user data to a cv file", async () => {
    const data = {
      user: {
        id: 123,
        first_name: "John",
        last_name: "Smith",
        birth_date: "1988-02-14",
        contacts: {
          place: "Berlin, Germany",
          phone: "+4917012345678",
          email: "john.smith@moberries.com",
        },
        experience: [
          {
            title: "Node.js Developer",
            company: "Amazon",
            start_date: "2011–06-23",
            end_date: "Present",
          },
          {
            title: "Backend Developer",
            company: "Amazon",
            start_date: "2006–07-14",
            end_date: "2011-06-01",
          },
        ],
      },
    };
    const filename = `${data.user.first_name}-${data.user.last_name}-cv.pdf`;

    const res = await request(app).post("/cv").send(data);

    expect(res.status).toBe(200);
    expect(res.header["content-type"]).toBe("application/pdf");
    expect(res.header["content-disposition"]).toBe(
      `attachment; filename="${filename}"`
    );
    expect(res.body).toBeInstanceOf(Buffer);
  });
});
