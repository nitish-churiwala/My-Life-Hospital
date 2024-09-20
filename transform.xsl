<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ns="http://www.example.com/doctors">
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Doctors List</title>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Available Doctors at My Life Hospital</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Qualification</th>
                            <th>Specialization</th>
                            <th>OPD Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="ns:doctors/ns:doctor">
                            <tr>
                                <td><xsl:value-of select="ns:name"/></td>
                                <td><xsl:value-of select="ns:qualification"/></td>
                                <td><xsl:value-of select="ns:specialization"/></td>
                                <td><xsl:value-of select="ns:opd_time"/></td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
