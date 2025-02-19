// test_client.ts
const BASE_URL = "http://localhost:8000";
let accessToken: string | null = null;
let testEmail = `test${Date.now()}@example.com`;
let testPassword = "password123";

// Helper to make authenticated requests
async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Important for cookies
  });
}

async function runTests() {
  console.log("\n🚀 Starting auth flow tests...");

  try {
    // Test Registration
    console.log("\n📝 Testing registration...");
    const registerResponse = await authFetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${await registerResponse.text()}`);
    }

    const registerData = await registerResponse.json();
    accessToken = registerData.accessToken;
    console.log("✅ Registration successful");
    console.log("📧 Registered email:", testEmail);
    console.log("🔑 Access token received");

    // Test Protected Route with valid token
    console.log("\n🔒 Testing protected route access...");
    const meResponse = await authFetch("/me");

    if (!meResponse.ok) {
      throw new Error(
        `Protected route access failed: ${await meResponse.text()}`
      );
    }

    const meData = await meResponse.json();
    console.log("✅ Protected route accessed successfully");
    console.log("👤 User data:", meData);

    // Test Logout
    console.log("\n👋 Testing logout...");
    const logoutResponse = await authFetch("/logout", {
      method: "POST",
    });

    if (!logoutResponse.ok) {
      throw new Error(`Logout failed: ${await logoutResponse.text()}`);
    }

    accessToken = null;
    console.log("✅ Logout successful");

    // Test Login
    console.log("\n🔑 Testing login...");
    const loginResponse = await authFetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${await loginResponse.text()}`);
    }

    const loginData = await loginResponse.json();
    accessToken = loginData.accessToken;
    console.log("✅ Login successful");
    console.log("🔑 New access token received");

    // Test Token Refresh
    console.log("\n🔄 Testing token refresh...");
    const refreshResponse = await authFetch("/refresh", {
      method: "POST",
    });

    if (!refreshResponse.ok) {
      throw new Error(`Token refresh failed: ${await refreshResponse.text()}`);
    }

    const refreshData = await refreshResponse.json();
    accessToken = refreshData.accessToken;
    console.log("✅ Token refresh successful");
    console.log("🔑 New access token received");

    // Test Protected Route Again
    console.log("\n🔒 Testing protected route with new token...");
    const meResponse2 = await authFetch("/me");

    if (!meResponse2.ok) {
      throw new Error(
        `Protected route access failed: ${await meResponse2.text()}`
      );
    }

    const meData2 = await meResponse2.json();
    console.log("✅ Protected route accessed successfully");
    console.log("👤 User data:", meData2);

    // Test Invalid Token
    console.log("\n❌ Testing invalid token...");
    accessToken = "invalid_token";
    const invalidResponse = await authFetch("/me");

    if (invalidResponse.status === 401) {
      console.log("✅ Unauthorized access properly rejected");
    } else {
      throw new Error("Invalid token not properly handled");
    }
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
  }
}

// Run the tests
console.log("🔥 Auth Flow Test Client");
console.log("----------------------");
await runTests();
