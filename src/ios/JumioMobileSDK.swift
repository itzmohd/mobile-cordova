<platform name="android">
        <config-file target="app/src/main/AndroidManifest.xml" parent="/*">
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
            <uses-permission android:name="android.permission.INTERNET"/>
            <uses-permission android:name="android.permission.CAMERA"/>
            <uses-permission android:name="android.permission.VIBRATE"/>
            <uses-permission android:name="android.permission.HIGH_SAMPLING_RATE_SENSORS"/>
            <uses-feature android:name="android.hardware.camera.autofocus" android:required="false"/>
        </config-file>
        <config-file target="config.xml" parent="/*">
            <feature name="JumioMobileSDK">
                <param name="android-package"
                    value="com.jumio.mobilesdk.JumioMobileSDK"/>
            </feature>
        </config-file>
        <proguard-config>
            -ignorewarnings
            -keep class com.jumio.** { *; }
            -keep class jumio.** { *; }
            -keep class com.microblink.** { *; }
            -keep class com.microblink.**$* { *; }
            -keep public class com.iproov.sdk.IProov {public *; }

            -keep class net.sf.scuba.smartcards.IsoDepCardService {*;}
            -keep class org.jmrtd.** { *; }
            -keep class net.sf.scuba.** {*;}
            -keep class org.bouncycastle.** {*;}
            -keep class org.ejbca.** {*;}

            -dontwarn java.nio.**
            -dontwarn org.codehaus.**
            -dontwarn org.ejbca.**
            -dontwarn org.bouncycastle.**
            -dontwarn com.microblink.**
            -dontwarn javax.annotation.Nullable
        </proguard-config>
        <framework src="src/android/plugin.gradle" custom="true" type="gradleReference"/>
        <source-file src="src/android/JumioMobileSDK.kt" target-dir="src/main/kotlin/com/jumio/mobilesdk"/>
		<resource-file src="src/android/res/values/jumio-styles.xml" target="res/values/jumio-styles.xml"/>
	</platform>
</plugin>
